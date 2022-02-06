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
		this.visited = new Array(this.adjSize);

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

    getLessConnections(v) {
        let min = 10;
        let posMin = -1;

        for (let i = 0; i < v.length; i++) {
            if (!this.visited[v[i]] && this.adj[v[i]].length <= min) {
                min = this.adj[v[i]].length;
                posMin = i;
            }
        }
        return posMin;
    }

	dfsKnight(v)
	{	
		for(let i = 0; i < this.adjSize; i++)
			this.visited[i] = false;
        
        this.path = []

        if(this.knightTour(v, 0, this.path, (this.adjSize) - 1)){
            console.log('deu bom')
            console.log(this.path)
        }else{
            console.log('deu ruim')
        }
	}

    knightTour(v, n, path, limit) {
        let done = false;
        let next = -2;
        let temp = this.adj[v].slice();
        this.visited[v] = true;
		path.push(v);

        if (n < limit){
            // proximo traz a aresta com o menor numero de conexões
            // temp guarda um novo vetor que vai sendo reduzido toda vez que o caminho chega ao fim
            while(!done && next != -1) { 
                if (next >= 0 && temp.length > 0) {
                    temp.splice(next, 1);
                }
                next = this.getLessConnections(temp);
                if (next != -1) {
                    done = this.knightTour(this.adj[v][this.adj[v].indexOf(temp[next], 0)], n+1, path, limit);
                }
            }
            // lastpop impede que o vetor de uma posição fique adicionando e retirando o mesmo elemento infinitamente
            if (!done) {
                this.lastpop = v;
                this.path.pop();
                this.visited[v] = false;
            }
        }
        else {
            done = true;
        }
        return done;

    }
	
	addEdge(v, w)
	{
		this.adj[v].push(w);
	}
}

