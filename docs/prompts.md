# Overview
I want to create a scripture reading web application application
I want the style to be dark background with soft muted hilights, similar to the cursor code editing UI

# Backend
FastAPI using sqlite database stored in ./submodules/sqlite/lds-scriptures-sqlite.db there is a schema.txt and README  and other files describing the data structure in that folder


# Frontend
Vite + React
I want the front-end to be mobile first and responsive for desktop clients.
The mobile interface should be intuitive and very small hacker like text.
Before starting the project suggest to me what CSS library or framework I might want to use to accomplish this.

# Code Organization
I want to have the front-end code separated from the back-end fast api code
suggest a folder structure and naming convention to accomplish this.

# Further Direction
- I'll be using uv, not pip for this project
- Addd the appropriate patterns to my .gitignore for React and Python projects
- I did some [Copilot](https://copilot.microsoft.com/shares/pages/znF1zmBzX5tBsby1ULrip) research on git submodules before starting the cursor part of this project
## Scripture Reading / Navigation instructions
- I'd like an interface that let's me navigate to volumes, books, and chapters for reading
- I like the responsive interface for mobile and desktop. After explanding a book to reveal the Chapters, I think "Chapter 1, Chapter 2" is a bit redundant. Can you conver the chapters to a flex box sort of grid that just contain the chapter numbers? I'm a bit OCD, and some volumes like the Doctrine and Covenants have chapters in the hundreds (3 characters wide). Can you make the width of the chapter selection boxes wide enough that the chapter 1 box will be just as wide as the chapter 123 box? This way, I'm hoping they all line up uniformly, assuming it doesn't take up too much additional space to cater to my box-width-ocd.
- change the Navigate button to "Read"
## random scripture
- I like the random button/feature you added. However it's not functional. What code changes would be required to make that functional?
- There is some inconsistency with the colors of the [READ] [SEARCH] [RANDOM] buttons. Can you fix it so that the page or feature that is currently in use is the only button highlighted?
- When I click Search, it turns blue, then when I click random a new random scripture appears, however [Search] is still "active"
- when search is clicked I still see the random scripture, can you blank out the previous content if search is clicked?

## Deployment
- where is a good place to deploy the front and back end? Would cloudflare be suitable? Are python service workers still in beta?
- you said both railway and cloudflare pages have generous free tiers. I believe that's true for cloudflare, however I only see a $5 hobby plan for railway. https://railway.com/pricing
- Whichever deployment option we choose, it'll need to have automatic deployment on code pushes
- If I choose Render, can I still use sqlite, or will I need to migrate to postgres? I would like to stay with sqlite if possible
- If I'm going to use Render, why not use it exclusively for front and back end. As my data will never change, and has no requirements to persist, it's fine if storage is ephemeral
- can you save this deployment stragegy into deployment.md in the root of the project?
- The front-end build failed with the following errors <...>

## More bugs
- If I use the Random feature, and view a random scripture, then use search feature, I see the search results, then below it is the random scripture. (This happens if there are search results or not, the random scripture is displayed.) I think when the Search button is clicked, the one that does the searching, the previous main contents should be blanked out
