#include <netinet/in.h>
#include <sys/socket.h>


void server(){
	char s[INET6_ADDRSTRLEN];
	socklen_t addr_len;
	char buf[MAXBUFLEN];
	struct sockaddr_storage their_addr;
	int numbytes;
	int sockfd;
	struct addrinfo hints, *servinfo, *p;
	int rv;
}
