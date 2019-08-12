# Window Behavior 
#### _Keeping a child window open when it's parent window closes_

> This repository demonstrates the creation of a **Window** from the same level as the **MainWindow**, 
> In the table below `rootFin` will be immediately invoked to storing a reference to each created
> **ChildWindows** `fin` object via the `window.opener` method. Using that reference we can then create
> each subsequent window from the **MainWindow** using this `rootFin` variable.
> An additional demonstration showing the ability to close the __children__ of a __Child Windows__, with out effecting the _closing_ of a __Child Window__ created from the __Main Window__ is also included. 

| __Main Window__ | __Child Window__ |    __Child Window Creation__  |
|-----------------|------------------|-------------------------------|
|     `rootFin`   | `window.opener`  | `rootFin.Window.create({...})`|

## Installation | Setup
- `git clone -b tickets/ticket-8811-4 https://github.com/adam-saland/app-template.git`
-  `cd | chdir app-template`
-  `npm i | install`
-  `npm run start`

### Support
Please enter an issue in the repo for any questions or problems. Alternatively, please contact us at support@openfin.co 

