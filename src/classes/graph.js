/**
 * Clase Graph - Implementa un grafo con lista de adyacencia
 */
class Graph {
  constructor() {
    this.nodes = []; // Lista de nodos
    this.adjacency = {}; // Objeto de adyacencia
  }

  /**
   * Agrega un nodo al grafo
   * @param {Object} node - Nodo a agregar
   */
  addNode(node) {
    if (!this.nodes.find(n => n.id === node.id)) {
      this.nodes.push(node);
      this.adjacency[node.id] = [];
    }
  }

  /**
   * Agrega una arista entre dos nodos
   * @param {string} nodeId1 - ID del primer nodo
   * @param {string} nodeId2 - ID del segundo nodo
   * @param {boolean} directed - Si es dirigido (por defecto false)
   */
  addEdge(nodeId1, nodeId2, directed = false) {
    if (!this.adjacency[nodeId1] || !this.adjacency[nodeId2]) {
      console.error('One or both nodes do not exist');
      return;
    }

    // Evitar aristas duplicadas
    if (!this.adjacency[nodeId1].includes(nodeId2)) {
      this.adjacency[nodeId1].push(nodeId2);
    }

    // Si no es dirigido, agregar la arista en ambas direcciones
    if (!directed && !this.adjacency[nodeId2].includes(nodeId1)) {
      this.adjacency[nodeId2].push(nodeId1);
    }
  }

  /**
   * Busca un nodo por su ID
   * @param {string} nodeId - ID del nodo a buscar
   * @returns {Object|null} - Nodo encontrado o null
   */
  searchNode(nodeId) {
    return this.nodes.find(node => node.id === nodeId) || null;
  }

  /**
   * Obtiene la lista de adyacencia de un nodo
   * @param {string} nodeId - ID del nodo
   * @returns {Array} - Lista de IDs de nodos adyacentes
   */
  getAdjacencyList(nodeId) {
    return this.adjacency[nodeId] || [];
  }

  /**
   * Obtiene todos los nodos adyacentes con su información completa
   * @param {string} nodeId - ID del nodo
   * @returns {Array} - Lista de nodos adyacentes
   */
  getAdjacentNodes(nodeId) {
    const adjacentIds = this.getAdjacencyList(nodeId);
    return adjacentIds.map(id => this.searchNode(id)).filter(node => node !== null);
  }

  /**
   * Imprime el grafo completo
   */
  printGraph() {
    console.log('=== GRAPH STRUCTURE ===');
    console.log('Nodes:', this.nodes);
    console.log('Adjacency List:', this.adjacency);
    
    this.nodes.forEach(node => {
      const adjacent = this.getAdjacencyList(node.id);
      console.log(`${node.id} -> [${adjacent.join(', ')}]`);
    });
  }

  /**
   * Obtiene todos los nodos de un tipo específico
   * @param {string} type - Tipo de nodo ('person' o 'city')
   * @returns {Array} - Lista de nodos del tipo especificado
   */
  getNodesByType(type) {
    return this.nodes.filter(node => node.type === type);
  }

  /**
   * Obtiene todas las personas que viven en una ciudad específica
   * @param {string} cityId - ID de la ciudad
   * @returns {Array} - Lista de personas que viven en esa ciudad
   */
  getPeopleInCity(cityId) {
    const city = this.searchNode(cityId);
    if (!city || city.type !== 'city') {
      return [];
    }

    // Buscar todas las personas conectadas a esta ciudad
    return this.nodes.filter(node => {
      if (node.type === 'person' && node.cityId === cityId) {
        return true;
      }
      return false;
    });
  }

  /**
   * Obtiene la ciudad de una persona
   * @param {string} personId - ID de la persona
   * @returns {Object|null} - Ciudad donde vive la persona o null
   */
  getPersonCity(personId) {
    const person = this.searchNode(personId);
    if (!person || person.type !== 'person') {
      return null;
    }

    return this.searchNode(person.cityId);
  }

  /**
   * Obtiene los amigos de una persona
   * @param {string} personId - ID de la persona
   * @returns {Array} - Lista de amigos
   */
  getFriends(personId) {
    const person = this.searchNode(personId);
    if (!person || person.type !== 'person') {
      return [];
    }

    const adjacentNodes = this.getAdjacentNodes(personId);
    return adjacentNodes.filter(node => node.type === 'person');
  }

  /**
   * Convierte el grafo a formato compatible con react-d3-graph
   * @returns {Object} - Objeto con nodes y links para d3
   */
  toD3Format() {
    const nodes = this.nodes.map(node => ({
      id: node.id,
      name: node.name,
      type: node.type,
      symbolType: node.type === 'city' ? 'square' : 'circle',
      color: node.type === 'city' ? '#3b82f6' : '#10b981',
      size: node.type === 'city' ? 600 : 400,
      fontSize: 12,
      fontColor: '#000000'
    }));

    const links = [];
    const processedEdges = new Set();

    Object.keys(this.adjacency).forEach(sourceId => {
      this.adjacency[sourceId].forEach(targetId => {
        const edgeKey = [sourceId, targetId].sort().join('-');
        if (!processedEdges.has(edgeKey)) {
          links.push({
            source: sourceId,
            target: targetId
          });
          processedEdges.add(edgeKey);
        }
      });
    });

    return { nodes, links };
  }
}

export default Graph;