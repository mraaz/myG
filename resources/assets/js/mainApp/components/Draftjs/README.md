# Draftjs Editors

This folder contains all the draft.js editors used in myG, along with shared helper logic. Styling for these components can be found within the "styles/components/DraftEditor" styles folder.

## Overview

There contains three main draft editors in this folder. The primary composer component used for creating posts. The second is the smaller reply composer. Last there is a static comment textbox, which doesnt allow for editing. Reply and static comment will be merged in the end.
The two main draft editors are different due to the different requirements from each editor. They do however share some help logic, found within "DraftHelpers.js".
