/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

//Simple string concatenation function
// char *concat(char* strOne, char* strTwo){
// 	char ret[1000];
// 	strcpy(ret, strOne);
// 	strcat(ret, strTwo);
// 	printf("RET: %s\n", ret);
// 	return &ret;
// }


int main(int argc, char const *argv[]){

	//Server file to append to
	FILE *server;

	//Buffer to hold new express route to be appended
	char* startOfRoute = "\n\napp.get('/";
	char* endOfRoute = "', (req, res) =>\n\tres.send('THIS HAS BEEN TESTED')\n);\n";

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
	if(strcmp(argv[2], "none") != 0){

		// char fullEnterDirectory[1000];
		// strcpy(fullEnterDirectory, enterDirectory);
		// strcat(fullEnterDirectory, argv[1]);

		system("touch uploads/MyProj/newTest.txt");
	}

	//Close server
	fclose(server);
	printf("Server has been closed for writing.\n");

	return 0;
}