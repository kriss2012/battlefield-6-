import React from 'react';

export const CharacterPortraits: Record<string, React.ReactNode> = {
  aryan_young: (
    <img src="/assets/characters/aryan.png" alt="Aryan Young" className="w-full h-full object-cover rounded-2xl" />
  ),
  aryan_shadow: (
    <img src="/assets/characters/aryan.png" alt="Aryan Shadow" className="w-full h-full object-cover rounded-2xl brightness-50 contrast-125" />
  ),
  savita: (
    <img src="/assets/characters/savita.png" alt="Savita Sharma" className="w-full h-full object-cover rounded-2xl" />
  ),
  balwant: (
    <img src="/assets/characters/balwant.png" alt="Balwant Singh" className="w-full h-full object-cover rounded-2xl" />
  ),
  kabir: (
    <img src="/assets/characters/kabir.png" alt="Kabir Rao" className="w-full h-full object-cover rounded-2xl" />
  ),
  director: (
    <img src="/assets/characters/director.png" alt="The Director" className="w-full h-full object-cover rounded-2xl" />
  )
};
