import { GraphEdge, GraphNode, calcDistance } from './graph';

export class PathFinderGraph {
    start: GraphNode;
    end: GraphNode;
    pointId: number = 0;
    maxDistanceOfEdge: number = 120;

    nodes: GraphNode[] = [];

    edges: GraphEdge[] = [];

    constructor(height: number, width: number) {
        this.generateNodes(height, width);
        this.nodes.forEach(node => this.addEdges(node));
        this.start = this.nodes[0];
        this.start.start = true;
        this.start.classes[0] = "start";
        this.end = this.nodes[this.nodes.length - 1]
        this.end.end = true;
        this.end.classes[0] = "end";
    }

    generateNodes(height: number, width: number) {
        const randomNum = (upTo: number) => (Math.round(Math.random() * (upTo - 60))) + 30;

        // rounded number of points depending on screen size
        let numberOfPoints = Math.round((width / 100 * height / 100) / 10) * 10;

        for (let i = 0; i < numberOfPoints; i++) {
            this.addNode(randomNum(width), randomNum(height))
        }
    }

    addNode(x: number, y: number){
        this.pointId++;
        this.nodes.push(
            new GraphNode(this.pointId, {x, y})
        )
    }

    filterEdges(node: GraphNode) {
        this.edges = this.edges.filter(edge => edge.pointA.id != node.id && edge.pointB.id != node.id);
    }

    allEdges() {
        this.nodes.forEach(node => {
            this.addEdges(node);
        });
    }

    addEdges(node: GraphNode) {
        this.nodes.forEach(n => {
            // checks to see if node ids are different and edge doesn't already exist in some form
            if (node.id != n.id && !this.edgeExists(node, n)) {
                if (calcDistance(node, n) <= this.maxDistanceOfEdge) {
                    this.edges.push(new GraphEdge(node, n))
                }
            }
        });
    }

    edgeExists(node1: GraphNode, node2: GraphNode) {
        return this.edges.some(e => {
            const node1Exists = e.pointB === node1 || e.pointA === node1;
            const node2Exists = e.pointB === node2 || e.pointA === node2;

            return node1Exists && node2Exists;
        });
    }


    reset(){
        this.nodes.forEach(node => {
            node.reset();
            if(node.start) {
                node.classes[0] = "start"
            }
            if(node.end) {
                node.classes[0] = "end"
            }
            this.addEdges(node)
        });
    }
}