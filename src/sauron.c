/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

char* concatenate(char* dest, char* src){
	while(*dest){
		dest++;
	}
	while((*dest++ = *src++));
	return --dest;
}

int main(int argc, char const *argv[]){

	//List of hosted projects that can be redirected to
	FILE *projectList;

	//Open list.pug for appending
	projectList = fopen("views/list.pug", "a");
	printf("Projects list has been opened for appending\n");

	//Exit if error with projectList
	if(projectList == NULL){
		perror("Error: ");
		printf("Terminating!\n");
		exit(EXIT_FAILURE);
	}

	//Buffer to hold new express route to be appended
	char newButton[1000] = "\n\t\tform(action='/";

	//Concatenate new route together
	char *buttonPointer = newButton;
	buttonPointer = concatenate(buttonPointer, (char *)argv[1]);
	buttonPointer = concatenate(buttonPointer, "', method='GET')\n\t\t\tdiv.project-button\n\t\t\t\tinput(type='submit', value='");
	buttonPointer = concatenate(buttonPointer, (char *) argv[1]);
	buttonPointer = concatenate(buttonPointer, "')\n");

	//Append to server
	printf("Writing to project list\n");

	fputs(newButton, projectList);

	//Close server
	fclose(projectList);
	printf("Projects list has been closed for writing\n");

	//Server file to append to
	FILE *server;

	//Open server for appending
	server = fopen("server.js", "a");
	printf("Server has been opened for appending\n");

	//Exit if error with server
	if(server == NULL){
		perror("Error: ");
		printf("Terminating!\n");
		exit(EXIT_FAILURE);
	}

	//Execute any necessary commands
	if(strcmp(argv[2], "none") != 0){

		//Buffer to hold new express route to be appended
		char newRoute[1000] = "\n\napp.get('/";

		//Concatenate new route together
		char *routePointer = newRoute;
		routePointer = concatenate(routePointer, (char *)argv[1]);
		routePointer = concatenate(routePointer, "', (req, res) =>\n\tres.send('localhost:");
		routePointer = concatenate(routePointer, (char *) argv[3]);
		routePointer = concatenate(routePointer, "')\n);\n");

		//Append to server
		printf("Writing to server\n");

		fputs(newRoute, server);

		//Close server
		fclose(server);
		printf("Server has been closed for writing\n");

		printf("Launching %s\n", argv[1]);

		//Set up start command
		char toExecute[1000] = "cd ../uploads/";
		char *executePointer = toExecute;
		executePointer = concatenate(executePointer, (char *) argv[1]);
		executePointer = concatenate(executePointer, "; PORT=");
		executePointer = concatenate(executePointer, (char *) argv[3]);
		executePointer = concatenate(executePointer, " ");
		executePointer = concatenate(executePointer, (char *) argv[2]);
		executePointer = concatenate(executePointer, " &");
		printf("%s\n", toExecute);

		system(toExecute);
	}
	else{
		//Buffer to hold new express route to be appended
		char newRoute[1000] = "\n\napp.get('/";

		//Concatenate new route together
		char *routePointer = newRoute;
		routePointer = concatenate(routePointer, (char *)argv[1]);
		routePointer = concatenate(routePointer, "', (req, res) =>\n\tres.sendFile(__dirname + 'uploads/");
		routePointer = concatenate(routePointer, (char *) argv[1]);
		routePointer = concatenate(routePointer, "/index.html')\n);\n");

		//Append to server
		printf("Writing to server\n");

		fputs(newRoute, server);

		//Close server
		fclose(server);
		printf("Server has been closed for writing\n");
	}

	//Flush stdout to console
	fflush(stdout);

	return 0;
}