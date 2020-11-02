import React from 'react';

const Card = ({ name }) => {
  return (
    <div className="px-5 py-4 pb-16 mb-3 bg-white border rounded-lg card-shadow">
      {name}
    </div>
  );
};

export default Card;
