/*Library Declarations*/
#include <stdio.h>
#include <stdlib.h>


int main(int argc, char const *argv[]){

	//Server file to append to
	FILE *server;
	//Buffer to hold new express route to be appended
	char* startOfRoute = "\n\napp.post('/";
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
	// while(*(++startOfRoute)){
	// 	fputc(*startOfRoute, server);
	// }
	// while(*(++argv[1])){
	// 	fputc(*argv[1], server);
	// }
	// while(*(++endOfRoute)){
	// 	fputc(*endOfRoute, server);
	// }
	fputs(startOfRoute, server);
	fputs(argv[1], server);
	fputs(endOfRoute, server);

	//Close server
	fclose(server);
	printf("Server has been closed.\n");
	// int i;
	// for(i = 0; i < argc; i++){
	// 	printf("%s\n", argv[i]);
	// }

	return 0;
}