# 📦 Submodules Guide

This project uses Git submodules to include external repositories. Submodules allow us to track and use code from other repositories while keeping them version-controlled and separate.

---

## Submodule Layout

All submodules are stored in the `submodules/` directory. Currently included:

- [`lds-scriptures`](https://github.com/beandog/lds-scriptures.git): A structured dataset of Latter-day Saint scriptures.

---

## Cloning This Repository

When cloning this repository, make sure to initialize and update submodules:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
git submodule update --init --recursive
```

Alternatively, clone and initialize in one step:

```bash
git clone --recurse-submodules https://github.com/your-username/your-repo.git
```

---

## Updating Submodules

To pull the latest changes from a submodule’s remote:

```bash
cd submodules/lds-scriptures
git pull origin main
cd ../..
git add submodules/lds-scriptures
git commit -m "Update lds-scriptures submodule"
```

---

## Removing a Submodule

If you ever need to remove a submodule:

```bash
git submodule deinit -f submodules/lds-scriptures
git rm -f submodules/lds-scriptures
rm -rf .git/modules/submodules/lds-scriptures
```

---

## Notes

* Submodules are pinned to a specific commit. Updating the submodule in your repo doesn’t affect the original repo.
* Always commit submodule changes after updating or initializing them.
* If you’re scripting or automating setup, include `git submodule update --init --recursive` in your setup script.

---

Happy hacking! 🛠️
