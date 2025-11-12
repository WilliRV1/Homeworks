import React from 'react';
import { User, MapPin, Users, Link as LinkIcon } from 'lucide-react';

const NodeDetails = ({ node, graph }) => {
  if (!node) {
    return (
      <div className="node-details empty">
        <p>Selecciona un nodo en el grafo para ver sus detalles</p>
      </div>
    );
  }

  const isPerson = node.type === 'person';
  const isCity = node.type === 'city';

  return (
    <div className="node-details">
      <div className="details-header">
        <div className="details-icon">
          {isPerson ? <User size={32} /> : <MapPin size={32} />}
        </div>
        <div>
          <h2>{node.name}</h2>
          <span className="node-type-badge">{isPerson ? 'Persona' : 'Ciudad'}</span>
        </div>
      </div>

      <div className="details-body">
        {isPerson && (
          <>
            <div className="detail-item">
              <strong>Edad:</strong>
              <span>{node.age} años</span>
            </div>
            <div className="detail-item">
              <strong>Ciudad:</strong>
              <span>{graph.getPersonCity(node.id)?.name || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <strong>ID:</strong>
              <span>{node.id}</span>
            </div>

            <div className="detail-section">
              <h3>
                <Users size={18} />
                Amigos ({graph.getFriends(node.id).length})
              </h3>
              <div className="friends-list">
                {graph.getFriends(node.id).map(friend => (
                  <div key={friend.id} className="friend-item">
                    <User size={16} />
                    <div>
                      <span className="friend-name">{friend.name}</span>
                      <span className="friend-location">
                        {graph.getPersonCity(friend.id)?.name}
                      </span>
                    </div>
                  </div>
                ))}
                {graph.getFriends(node.id).length === 0 && (
                  <p className="no-data">No tiene amigos registrados</p>
                )}
              </div>
            </div>
          </>
        )}

        {isCity && (
          <>
            <div className="detail-item">
              <strong>Tipo:</strong>
              <span>Ciudad</span>
            </div>
            <div className="detail-item">
              <strong>ID:</strong>
              <span>{node.id}</span>
            </div>

            <div className="detail-section">
              <h3>
                <Users size={18} />
                Habitantes ({graph.getPeopleInCity(node.id).length})
              </h3>
              <div className="people-list-details">
                {graph.getPeopleInCity(node.id).map(person => (
                  <div key={person.id} className="person-item">
                    <User size={16} />
                    <div>
                      <span className="person-name">{person.name}</span>
                      <span className="person-age">{person.age} años</span>
                    </div>
                  </div>
                ))}
                {graph.getPeopleInCity(node.id).length === 0 && (
                  <p className="no-data">No hay habitantes registrados</p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="detail-section">
          <h3>
            <LinkIcon size={18} />
            Conexiones ({graph.getAdjacencyList(node.id).length})
          </h3>
          <div className="connections-list">
            {graph.getAdjacentNodes(node.id).map(adjacent => (
              <div key={adjacent.id} className="connection-item">
                {adjacent.type === 'person' ? <User size={14} /> : <MapPin size={14} />}
                <span>{adjacent.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;