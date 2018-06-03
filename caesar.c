/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main(int argc, char const *argv[]){

	//Server file to append to
	FILE *server;

	//Buffer to hold new express route to be appended
	char* startOfRoute = "\n\napp.get('/";
	char* endOfRoute = "', (req, res) =>\n\tres.send('THIS HAS BEEN TESTED')\n);\n";

	//Commands to navigate for starting servers
	char *enterDirectoryArgv[2] = {"uploads/" + argv[1], NULL};
	char* exitDirectoryArgv[2] = {"../..", NULL};

	//Open server for appending
	server = fopen("server.js", "a");
	printf("Server has been opened for appending.\n");

	if(server == NULL){
		perror("Error: ");
		printf("Terminating!\n");
		exit(EXIT_FAILURE);
	}

	//Append to server
	printf("Writing to server.\n");

	fputs(startOfRoute, server);
	fputs(argv[1], server);
	fputs(endOfRoute, server);

	//Execute any necessary commands
	if(strcmp(argv[2], "none") == 0){
		execv("cd", enterDirectoryArgv);
		execv(argv[2], NULL);
		execv("cd", exitDirectoryArgv);
	}

	//Close server
	fclose(server);
	printf("Server has been closed for writing.\n");

	return 0;
}