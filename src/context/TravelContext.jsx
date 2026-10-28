import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStatesData } from '../data/travelData';

const TravelContext = createContext();

export function TravelProvider({ children }) {
  const [states, setStates] = useState(() => {
    const saved = localStorage.getItem('travelbharat_states_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state data, using defaults:', e);
      }
    }
    return initialStatesData;
  });

  useEffect(() => {
    localStorage.setItem('travelbharat_states_v1', JSON.stringify(states));
  }, [states]);

  // Add a new tourist place to an existing state
  const addPlaceToState = (stateId, newPlace) => {
    setStates((prevStates) =>
      prevStates.map((s) => {
        if (s.id === stateId) {
          return {
            ...s,
            places: [...s.places, newPlace]
          };
        }
        return s;
      })
    );
  };

  // Delete a tourist place
  const deletePlace = (stateId, placeId) => {
    setStates((prevStates) =>
      prevStates.map((s) => {
        if (s.id === stateId) {
          return {
            ...s,
            places: s.places.filter((p) => p.id !== placeId)
          };
        }
        return s;
      })
    );
  };

  // Reset data to defaults
  const resetToDefault = () => {
    localStorage.removeItem('travelbharat_states_v1');
    setStates(initialStatesData);
  };

  return (
    <TravelContext.Provider
      value={{
        states,
        addPlaceToState,
        deletePlace,
        resetToDefault
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}