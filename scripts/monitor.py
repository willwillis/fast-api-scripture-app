#!/usr/bin/env python3
"""
Scripture App Monitoring Script

This script provides local monitoring capabilities for the FastAPI backend,
including warm-up testing and performance metrics collection.
"""

import requests
import time
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

class ScriptureMonitor:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.session = requests.Session()
        
    def log(self, message: str, level: str = "INFO"):
        """Log messages with timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {level}: {message}")
        
    def test_health(self) -> Dict[str, Any]:
        """Test the health endpoint"""
        try:
            start_time = time.time()
            response = self.session.get(f"{self.base_url}/health", timeout=30)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "status": "success",
                    "response_time": response_time,
                    "data": data,
                    "warmed_up": data.get("warmed_up", False)
                }
            else:
                return {
                    "status": "error",
                    "response_time": response_time,
                    "status_code": response.status_code,
                    "error": f"HTTP {response.status_code}"
                }
        except Exception as e:
            return {
                "status": "error",
                "response_time": None,
                "error": str(e)
            }
            
    def test_endpoint(self, endpoint: str, name: str) -> Dict[str, Any]:
        """Test a specific endpoint"""
        try:
            start_time = time.time()
            response = self.session.get(f"{self.base_url}{endpoint}", timeout=30)
            response_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "status": "success",
                    "name": name,
                    "endpoint": endpoint,
                    "response_time": response_time,
                    "data_length": len(str(data))
                }
            else:
                return {
                    "status": "error",
                    "name": name,
                    "endpoint": endpoint,
                    "response_time": response_time,
                    "status_code": response.status_code,
                    "error": f"HTTP {response.status_code}"
                }
        except Exception as e:
            return {
                "status": "error",
                "name": name,
                "endpoint": endpoint,
                "response_time": None,
                "error": str(e)
            }
            
    def warm_up_service(self, wait_minutes: int = 5) -> bool:
        """Warm up the service with initial requests"""
        self.log("Starting service warm-up...")
        
        # Initial health check to trigger cold start
        self.log("Making initial health check request...")
        initial_result = self.test_health()
        
        if initial_result["status"] == "error":
            self.log("Initial request failed (expected for cold start)", "WARNING")
        else:
            self.log(f"Initial response time: {initial_result['response_time']:.2f}s")
            
        # Wait for service to warm up
        self.log(f"Waiting {wait_minutes} minutes for service to warm up...")
        time.sleep(wait_minutes * 60)
        
        self.log("Warm-up period complete")
        return True
        
    def run_full_test_suite(self, warm_up: bool = True) -> Dict[str, Any]:
        """Run the complete test suite"""
        results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": self.base_url,
            "tests": {}
        }
        
        if warm_up:
            self.warm_up_service()
            
        # Test health endpoint
        self.log("Testing health endpoint...")
        results["tests"]["health"] = self.test_health()
        
        # Test core endpoints
        endpoints = [
            ("/api/scriptures/volumes", "Volumes"),
            ("/api/scriptures/random", "Random Scripture"),
            ("/api/scriptures/search?q=love&limit=5", "Search"),
        ]
        
        for endpoint, name in endpoints:
            self.log(f"Testing {name} endpoint...")
            results["tests"][name.lower().replace(" ", "_")] = self.test_endpoint(endpoint, name)
            
        return results
        
    def print_results(self, results: Dict[str, Any]):
        """Print formatted test results"""
        print("\n" + "="*60)
        print("SCRIPTURE APP MONITORING RESULTS")
        print("="*60)
        print(f"Timestamp: {results['timestamp']}")
        print(f"Base URL: {results['base_url']}")
        print("-"*60)
        
        all_passed = True
        total_response_time = 0
        response_count = 0
        
        for test_name, result in results["tests"].items():
            status_icon = "✅" if result["status"] == "success" else "❌"
            print(f"{status_icon} {test_name.upper()}")
            
            if result["status"] == "success":
                response_time = result.get("response_time", 0)
                total_response_time += response_time
                response_count += 1
                
                print(f"   Response Time: {response_time:.2f}s")
                
                if "warmed_up" in result:
                    print(f"   Warmed Up: {result['warmed_up']}")
                    
                if "data_length" in result:
                    print(f"   Data Size: {result['data_length']} chars")
            else:
                all_passed = False
                print(f"   Error: {result.get('error', 'Unknown error')}")
                
            print()
            
        # Summary
        print("-"*60)
        if all_passed:
            avg_response_time = total_response_time / response_count if response_count > 0 else 0
            print(f"🎉 ALL TESTS PASSED!")
            print(f"📊 Average Response Time: {avg_response_time:.2f}s")
        else:
            print("❌ SOME TESTS FAILED")
            
        print("="*60)
        
        return all_passed

def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Scripture App Monitoring")
    parser.add_argument("--url", default="http://localhost:8000", 
                       help="Base URL of the API (default: http://localhost:8000)")
    parser.add_argument("--warm-up", action="store_true", default=True,
                       help="Warm up the service before testing")
    parser.add_argument("--wait", type=int, default=5,
                       help="Wait time in minutes for warm-up (default: 5)")
    parser.add_argument("--output", help="Save results to JSON file")
    
    args = parser.parse_args()
    
    monitor = ScriptureMonitor(args.url)
    
    try:
        results = monitor.run_full_test_suite(warm_up=args.warm_up)
        success = monitor.print_results(results)
        
        if args.output:
            with open(args.output, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"Results saved to {args.output}")
            
        sys.exit(0 if success else 1)
        
    except KeyboardInterrupt:
        print("\nMonitoring interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"Monitoring failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 