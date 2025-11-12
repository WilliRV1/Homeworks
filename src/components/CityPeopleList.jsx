import React, { useState } from 'react';
import { MapPin, Users, ChevronDown, ChevronRight, User } from 'lucide-react';

const CityPeopleList = ({ graph }) => {
  const [expandedCities, setExpandedCities] = useState(new Set());
  const [selectedPerson, setSelectedPerson] = useState(null);

  const cities = graph.getNodesByType('city');

  const toggleCity = (cityId) => {
    setExpandedCities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cityId)) {
        newSet.delete(cityId);
      } else {
        newSet.add(cityId);
      }
      return newSet;
    });
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(selectedPerson?.id === person.id ? null : person);
  };

  return (
    <div className="city-people-list">
      <div className="list-header">
        <h2>Personas por Ciudad</h2>
        <p>Haz clic en una ciudad para ver sus habitantes</p>
      </div>

      <div className="cities-container">
        {cities.map(city => {
          const people = graph.getPeopleInCity(city.id);
          const isExpanded = expandedCities.has(city.id);

          return (
            <div key={city.id} className="city-card">
              <div 
                className="city-header"
                onClick={() => toggleCity(city.id)}
              >
                <div className="city-info">
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <MapPin size={20} className="city-icon" />
                  <h3>{city.name}</h3>
                </div>
                <div className="city-badge">
                  <Users size={16} />
                  <span>{people.length}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="people-list">
                  {people.length === 0 ? (
                    <p className="no-people">No hay personas en esta ciudad</p>
                  ) : (
                    people.map(person => {
                      const friends = graph.getFriends(person.id);
                      const isSelected = selectedPerson?.id === person.id;

                      return (
                        <div key={person.id} className="person-card">
                          <div 
                            className={`person-info ${isSelected ? 'selected' : ''}`}
                            onClick={() => handlePersonClick(person)}
                          >
                            <User size={18} className="person-icon" />
                            <div className="person-details">
                              <span className="person-name">{person.name}</span>
                              <span className="person-age">{person.age} años</span>
                            </div>
                            <div className="friends-badge">
                              {friends.length} amigos
                            </div>
                          </div>

                          {isSelected && (
                            <div className="person-friends">
                              <h4>Amigos de {person.name}:</h4>
                              {friends.length === 0 ? (
                                <p className="no-friends">No tiene amigos registrados</p>
                              ) : (
                                <ul>
                                  {friends.map(friend => (
                                    <li key={friend.id}>
                                      <User size={14} />
                                      <span>{friend.name}</span>
                                      <span className="friend-city">
                                        ({graph.getPersonCity(friend.id)?.name})
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityPeopleList;