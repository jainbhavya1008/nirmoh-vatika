# How to add a new PDF (no coding needed)

You only do two things: **copy the PDF into a folder**, then **add 8 lines to one file**.

## Step 1. Copy the PDF into the right folder
| It is a... | Copy the PDF into this folder |
|---|---|
| Book | `pdfs/books/` |
| Question paper / question bank | `pdfs/questions/` |
| Pratiyogita (competition) document | `pdfs/pratiyogita/` |

Give the file a simple name: small letters, numbers and dashes only, no spaces. Example: `nirmoh-vatika-part-2.pdf`.
(Very large files are slow for visitors. GitHub accepts files up to 100 MB; try to stay under 50 MB.)

## Step 2. Add a cover picture (books only, optional)
Save a picture (JPG, about 600 pixels wide) in `assets/img/covers/`, for example `part-2.jpg`. If you skip this, a simple symbol is shown instead.

## Step 3. Add the entry in `content-data.js`
Open `content-data.js` with Notepad or VS Code. Find the list you need (`books`, `questions` or `pratiyogita`). Copy an existing block and change the words. Put a **comma** after the block before it.

```js
    {
      id: "part2",                          // a short unique word, no spaces
      title: "Nirmoh Vatika — Part 2",
      edition: "Hindi Edition",
      language: "Hindi",
      category: "Nirmoh Vatika",
      pages: 40,
      size: "12 MB",
      description: "One or two sentences about the book.",
      cover: "assets/img/covers/part-2.jpg",
      pdf: "pdfs/books/nirmoh-vatika-part-2.pdf",
      download: true
    }
```
* `download: false` = visitors can read it online but no Download button is shown.
* For Questions and Pratiyogita you can leave out `cover`, `edition`, `language`, `pages` and `size`. You may add `date: "text"` for Pratiyogita.
* Do not use a slash at the start of a path. Right: `"pdfs/books/x.pdf"`. Wrong: `"/pdfs/books/x.pdf"`.
* The name in `pdf:` must match the real file name exactly, including small and capital letters.

## Step 4. Check it on your computer
Double-click `START-PREVIEW.bat`, open http://localhost:8000/ and look at the page. Press **Ctrl+F5** if the old list is still shown.

## Step 5. Publish again
Later, when the website is online, you will upload the changed files again (the README explains how).

## Only publish what you have the right to share
Add only PDFs that you own or that you have permission to distribute.
