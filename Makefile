#Makefile to build caesar.c and any helper programs needed

CC = gcc
CFLAGS = -Wall -o

all: clean caesar

caesar:
	$(CC) $(CFLAGS) caesar caesar.c

clean:
	rm -f *.o caesar