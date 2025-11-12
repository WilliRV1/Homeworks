import Graph from '../classes/Graph';

/**
 * Inicializa y crea el grafo de amigos y ciudades
 */
export const createFriendsCitiesGraph = () => {
  const graph = new Graph();

  // ===== CIUDADES =====
  const cities = [
    { id: 'city-cali', name: 'Cali', type: 'city' },
    { id: 'city-bogota', name: 'Bogotá', type: 'city' },
    { id: 'city-medellin', name: 'Medellín', type: 'city' },
    { id: 'city-cartagena', name: 'Cartagena', type: 'city' }
  ];

  // Agregar ciudades al grafo
  cities.forEach(city => graph.addNode(city));

  // ===== PERSONAS =====
  const people = [
    // Personas en Cali
    { id: 'person-ana', name: 'Ana García', age: 25, type: 'person', cityId: 'city-cali' },
    { id: 'person-carlos', name: 'Carlos Ruiz', age: 30, type: 'person', cityId: 'city-cali' },
    { id: 'person-diana', name: 'Diana López', age: 28, type: 'person', cityId: 'city-cali' },
    { id: 'person-luis', name: 'Luis Martínez', age: 32, type: 'person', cityId: 'city-cali' },
    
    // Personas en Bogotá
    { id: 'person-maria', name: 'María Rodríguez', age: 27, type: 'person', cityId: 'city-bogota' },
    { id: 'person-pedro', name: 'Pedro Sánchez', age: 35, type: 'person', cityId: 'city-bogota' },
    { id: 'person-sofia', name: 'Sofía Torres', age: 24, type: 'person', cityId: 'city-bogota' },
    
    // Personas en Medellín
    { id: 'person-juan', name: 'Juan Pérez', age: 29, type: 'person', cityId: 'city-medellin' },
    { id: 'person-laura', name: 'Laura Gómez', age: 26, type: 'person', cityId: 'city-medellin' },
    { id: 'person-diego', name: 'Diego Vargas', age: 31, type: 'person', cityId: 'city-medellin' },
    
    // Personas en Cartagena
    { id: 'person-camila', name: 'Camila Herrera', age: 23, type: 'person', cityId: 'city-cartagena' },
    { id: 'person-andres', name: 'Andrés Castro', age: 28, type: 'person', cityId: 'city-cartagena' }
  ];

  // Agregar personas al grafo
  people.forEach(person => graph.addNode(person));

  // ===== CONEXIONES: Persona -> Ciudad =====
  // Cada persona se conecta con su ciudad
  people.forEach(person => {
    graph.addEdge(person.id, person.cityId, false);
  });

  // ===== CONEXIONES: Amistades (Persona -> Persona) =====
  // Amistades en Cali
  graph.addEdge('person-ana', 'person-carlos', false);
  graph.addEdge('person-ana', 'person-diana', false);
  graph.addEdge('person-carlos', 'person-luis', false);
  graph.addEdge('person-diana', 'person-luis', false);
  
  // Amistades en Bogotá
  graph.addEdge('person-maria', 'person-pedro', false);
  graph.addEdge('person-maria', 'person-sofia', false);
  graph.addEdge('person-pedro', 'person-sofia', false);
  
  // Amistades en Medellín
  graph.addEdge('person-juan', 'person-laura', false);
  graph.addEdge('person-laura', 'person-diego', false);
  graph.addEdge('person-juan', 'person-diego', false);
  
  // Amistades en Cartagena
  graph.addEdge('person-camila', 'person-andres', false);
  
  // Amistades entre ciudades (amigos de diferentes ciudades)
  graph.addEdge('person-ana', 'person-maria', false); // Cali - Bogotá
  graph.addEdge('person-carlos', 'person-juan', false); // Cali - Medellín
  graph.addEdge('person-maria', 'person-juan', false); // Bogotá - Medellín
  graph.addEdge('person-diana', 'person-camila', false); // Cali - Cartagena
  graph.addEdge('person-pedro', 'person-diego', false); // Bogotá - Medellín

  // Imprimir información del grafo en consola
  console.log('🌐 Graph Created Successfully!');
  console.log(`📍 Cities: ${cities.length}`);
  console.log(`👥 People: ${people.length}`);
  graph.printGraph();

  // Mostrar ejemplo de personas por ciudad
  console.log('\n📋 People by City:');
  cities.forEach(city => {
    const peopleInCity = graph.getPeopleInCity(city.id);
    console.log(`${city.name}: ${peopleInCity.map(p => p.name).join(', ')}`);
  });

  return graph;
};

// Crear el grafo al cargar el módulo
export const friendsCitiesGraph = createFriendsCitiesGraph();

export default friendsCitiesGraph;