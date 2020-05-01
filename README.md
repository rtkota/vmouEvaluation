Create Following objects in Evaluation database in mongodb:
1. Batches Document
{
	"batchcode":"bapEMT1",
	"userid":"5ea83b1cb27f7931084d6f5a",
	"type":"marks1",
	"exam":"DEC19",
	"pcode":"BAP",
	"ccode":"EMT",
	"ptype":"TE",
	"totalcopies":30,
	"attempts":0,
	"mmarks":80,
	"status":"created",
	"marks":[{
		"controlno":"191139-010001",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010002",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010003",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010004",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010005",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010006",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010007",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010008",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010009",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010010",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010011",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010012",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010013",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010014",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010015",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010016",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010017",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010018",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010019",
		"award":0,
		"status": "  "
	},{
		"controlno":"191139-010020",
		"award":0,
		"status": "  "
	}]
}

2. In users Document :
{
	"name":"Rajesh",
	"email":"rajesh@gmail.com",
	"password":"121212"
	}
  
 NOTE : After entering the above user replace userid in batch created above with object ID of user created above.
        One more batch object can also be created with differenct batch code and control nos(in sequence eg 191139-010021 onwards

----------------------------------------------------------------------------------------------------------------------------------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
