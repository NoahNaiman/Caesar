#Makefile to build sauron.c and any helper programs needed

CC = gcc
CFLAGS = -Wall -o

all: clean sauron

sauron:
	$(CC) $(CFLAGS) bin/sauron src/sauron.c

clean:
	rm -f bin/*.o bin/sauron