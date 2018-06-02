#Makefile to build caesar.c and any helper programs needed

CC = gcc
CFLAGS = -Wall -o

all: caesar

caesar:
	$(CC) $(CFLAGS) caesar caesar.c