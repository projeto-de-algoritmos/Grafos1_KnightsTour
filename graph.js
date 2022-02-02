class Graph
{	
	// Construtor
	constructor(v)
	{
        this.N = v;
        this.adjSize = v * v; //Tamanho da lista de adjacências (quantidade de casas em um tabuleiro)
		this.adj = new Array(this.adjSize); //Lista de adjacências
        this.path = []; //Solução do knight's tour

		for(let i = 0; i < this.adjSize; i++)
			this.adj[i] = [];

	}

    isSafe(x, y, next_x, next_y) //Checa se o movimento é válido
    {
	    return(((x + next_x) >= 0) && ((y + next_y) >= 0) && ((x + next_x) < this.N) && ((y + next_y) < this.N));
    }

    createAdjacencyList(){  // popula lista de adjacências

        //Arrays com todos os 8 possíveis movimentos de um cavalo
        let xMove = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
	    let yMove = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

        for (let i = 0; i < this.N; i++){
            for (let j = 0; j < this.N; j++){
                for(let k = 0; k < 8; k++){
                    if(this.isSafe(i, j, xMove[k], yMove[k])){
                        this.addEdge((i * this.N) + j, ((this.N * xMove[k]) + yMove[k]) + (i * this.N) + j)
                    }
                }
            }
        }
    }

	dfsKnight(v)
	{	
		let visited = new Array(this.adjSize);
		for(let i = 0; i < this.adjSize; i++)
			visited[i] = false;

        if(this.knightTour(v, visited, 0, this.path, (this.adjSize) - 1)){
            console.log('deu bom')
        }else{
            console.log('deu ruim')
        }
	}


    /*baseado em http://www.pas.rochester.edu/~rsarkis/csc162/_static/lectures/Graphs%20-%20DFS.pdf 
      e em https://panda.ime.usp.br/panda/static/pythonds_pt/07-Grafos/ImplementingKnightsTour.html

      Por enquanto, só funciona em tabuleiros pequenos(explicação no final desse site: https://bradfieldcs.com/algos/graphs/knights-tour/)
      Também só funciona quando o nó inicial é par (Não sei o motivo)
    */
    knightTour(v, visited, n, path, limit){ 
        let done;
        visited[v] = true;
		path.push(v);

        if(n < limit){
            done = false;
            let j = 0;
            while((j < this.adj[v].length) && (!done)){
                if (!visited[this.adj[v][j]])
                    done = this.knightTour(this.adj[v][j], visited, n+1, path, limit);
                j = j + 1;
            }
            if(!done){
                path.pop();
                visited[v] = false
            }
        }
        else{
            done = true;
        }
        return done;

    }
	
	// Function to add an edge into the graph
	addEdge(v, w)
	{
		// Add w to v's list.
		this.adj[v].push(w);
	}
}

g = new Graph(5); // inicializa um tabuleiro 5x5
g.createAdjacencyList() 
console.log(g.adj)
g.dfsKnight(0)
console.log(g.path)
