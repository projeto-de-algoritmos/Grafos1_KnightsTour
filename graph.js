class Graph
{	
	// Construtor
	constructor(v)
	{
        this.N = v;
        this.adjSize = v * v; //Tamanho da lista de adjacências (quantidade de casas em um tabuleiro)
		this.adj = new Array(this.adjSize); //Lista de adjacências
        this.path = []; //Solução do knight's tour
        this.lastpop = -1;

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

    getLessConnections(v, visited) {
        let min = 10;
        let posMin = -1;

        for (let i = 0; i < v.length; i++)
            if (!visited[v[i]] && this.adj[v[i]].length <= min) {
                min = this.adj[v[i]].length;
                posMin = i;
            }
        return posMin;
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
    knightTour(v, visited, n, path, limit) {
        let done = false;
        let next = -2;
        let temp = this.adj[v].slice();
        //console.log("added: ", v);
        visited[v] = true;
		path.push(v);

        if (n < limit){
            while(!done && next != -1) {
                if (next >= 0 && temp.length > 0) {
                    //console.log(temp);
                    temp.splice(next, 1);
                    //console.log(temp);
                }
                next = this.getLessConnections(temp, visited);
                if (next != -1)
                    done = this.knightTour(this.adj[v][next], visited, n+1, path, limit);
            }
            if (!done) {
                this.lastpop = v;
                this.path.pop();
                //console.log("pop: ", v);
                //console.log(this.path);
                //console.log(visited);
                //console.log(v);
                visited[v] = false;
            }
        }
        else {
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

g = new Graph(4); // inicializa um tabuleiro 5x5
g.createAdjacencyList() 
console.log(g.adj)
g.dfsKnight(6)
//console.log(g.path)
console.log(g.path.sort(function(a, b) {
    return a - b;
  }))
