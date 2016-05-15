# Two-Resource REST API with Angular CRUD Interface

Store your favorite Star Trek and Star Wars characters in a database and randomly pit them against one another in battle!

This app requires a local install of [MongoDB](http://www.mongodb.com).

First, clone the repo containing the API server (<https://github.com/hollislau/rest_api.git>), navigate to the `hollis_lau` directory, and install the server with `npm install`. You may verify the tests with `npm test` or `gulp` if you wish (start up MongoDB with `mongod` in another shell first).

Next, in a second shell, clone this repo and install the client server with `npm install`. To verify integration tests, first close any instances of servers running on port `3000` or `5000`. The gulp tasks managing the tests automatically create child processes to run these dependencies and will create conflicts if those ports are already in use. Once the required ports are free, run `gulp` to verify the integration tests. If you decide not to run the tests, you must first compile the necessary files by running `gulp build:dev` before proceeding.

If not already running, start up your database with `mongod` in a third shell, then run `npm start` from your first shell to get your API server going. The port defaults to `3000` unless you have a PORT environment variable set up. Finally, run `npm start` from your second shell to start your client server on port `5000`. Navigate to <http://localhost:5000> to add some Star Trek and Star Wars characters to your database.

To add a character, enter any strings you like in the provided fields, except for the `power` field which takes a number. __The `name`, `weapon`, and `power` fields are required;__ the others are optional. The `power` value represents the strength of the character in battle. A character with a larger `power` value will always defeat one with a smaller value. Choose any `power` values you like, but they must be valid numbers. For your Star Trek characters, default values of "Phaser" and "Enterprise" have been set for the `weapon` and `ship` fields, respectively. If values are not provided for those fields, the default values will be saved to the database. Hit the `Create` button when you are finished. A list of your current collection of characters will be displayed on the page.

To edit a character, click the `Edit` button beneath the entry you wish to update. Modify the desired fields, then hit the `Update` button to save your changes to the database. The `Cancel` button will discard any changes and return you to the list view.

To remove a character, click the `Delete` button beneath the entry you with to remove.

To have your heroes face off, click the `Fight!` button at the bottom of the page. The API server will randomly select one of your Star Trek and Star Wars characters to fight against each other and return an outcome depending on the power levels of the respective characters. You may repeatedly hit the `Fight!` button to have a new pair of characters battle each time. If either of your collections is empty, pressing the `Fight!` button will prompt you to add at least one character to each collection.
