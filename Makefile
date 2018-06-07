#Makefile to build sauron.c and any helper programs needed

CC = gcc
CFLAGS = -Wall -o

all: clean sauron

sauron:
	$(CC) $(CFLAGS) src/sauron src/sauron.c

clean:
	rm -f src/*.o src/sauron