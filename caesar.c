/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>


int main(int argc, char const *argv[]){

	//Server file to append to
	FILE *server;
	//Buffer to hold new express route to be appended
	char newRoute[1000];

	//Open server for appending
	server = fopen("server.js", "a");
	printf("Server has been opened for appending.\n");

	if(server == NULL){
		perror("Error: ");
		printf("Terminating!\n");
		exit(EXIT_FAILURE);
	}

	//Close server
	fclose(server);
	printf("Server has been closed.\n");
	// int i;
	// for(i = 0; i < argc; i++){
	// 	printf("%s\n", argv[i]);
	// }

	return 0;
}