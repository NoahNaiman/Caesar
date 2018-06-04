#Makefile to build sauron.c and any helper programs needed

CC = gcc
CFLAGS = -Wall -o

all: clean sauron

sauron:
	$(CC) $(CFLAGS) sauron sauron.c

clean:
	rm -f *.o sauron