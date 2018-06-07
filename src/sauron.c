/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

char* concatenate(char* dest, char* src){
	while(*dest){
		dest++;
	}
	while(*dest++ = *src++);
	return --dest;
}

int main(int argc, char const *argv[]){

	//Server file to append to
	FILE *server;

	//Buffer to hold new express route to be appended
	char* startOfRoute = "\n\napp.get('/";
	char* endOfRoute = "', (req, res) =>\n\tres.send('THIS HAS BEEN TESTED')\n);\n";

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

	fputs(startOfRoute, server);
	fputs(argv[1], server);
	fputs(endOfRoute, server);

	//Close server
	fclose(server);
	printf("Server has been closed for writing\n");


	//Execute any necessary commands
	if(strcmp(argv[2], "none") != 0){

		printf("Launching %s\n", argv[1]);

		//Set up start command
		char toExecute[1000] = "cd ../uploads/";
		char *pointer = toExecute;
		pointer = concatenate(pointer, argv[1]);
		pointer = concatenate(pointer, "; PORT=");
		pointer = concatenate(pointer, argv[3]);
		pointer = concatenate(pointer, " ");
		pointer = concatenate(pointer, argv[2]);
		printf("%s\n", toExecute);

		system(toExecute);
	}

	return 0;
}