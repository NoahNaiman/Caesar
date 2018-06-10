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

	//Server file to append to
	FILE *server;

	//Buffer to hold new express route to be appended
	char newRoute[1000] = "\n\napp.get('/";

	//Concatenate new route together
	char *routePointer = newRoute;
	routePointer = concatenate(routePointer, (char *)argv[1]);
	routePointer = concatenate(routePointer, "', (req, res) =>\n\tres.send('localhost:");
	routePointer = concatenate(routePointer, (char *) argv[3]);
	routePointer = concatenate(routePointer, "')\n);\n");

	//Open server for appending
	server = fopen("server.js", "a");
	printf("Server has been opened for appending\n");

	if(server == NULL){
		perror("Error: ");
		printf("Terminating!\n");
		exit(EXIT_FAILURE);
	}

	//Append to server
	printf("Writing to server\n");

	fputs(newRoute, server);

	//Close server
	fclose(server);
	printf("Server has been closed for writing\n");


	//Execute any necessary commands
	if(strcmp(argv[2], "none") != 0){

		printf("Launching %s\n", argv[1]);

		//Set up start command
		char toExecute[1000] = "cd ../uploads/";
		char *executePointer = toExecute;
		executePointer = concatenate(executePointer, (char *) argv[1]);
		executePointer = concatenate(executePointer, "; PORT=");
		executePointer = concatenate(executePointer, (char *) argv[3]);
		executePointer = concatenate(executePointer, " ");
		executePointer = concatenate(executePointer, (char *) argv[2]);
		printf("%s\n", toExecute);

		system(toExecute);
	}

	return 0;
}