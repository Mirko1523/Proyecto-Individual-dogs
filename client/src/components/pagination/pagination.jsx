
import React, { useEffect } from 'react';
import './pagination.styles.css'; 

export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    //  console.log("currentPage:", currentPage);
  // console.log("totalCards:", totalCards);
  // console.log("cardPerPage:", cardPerPage);
    if (Math.ceil(totalCards / cardPerPage) < currentPage) {
      paginate(1);
    }
  }, [currentPage, totalCards, cardPerPage, paginate]);


  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        {pageNumbers.map((p, i) => (
          <li key={i} className="pagination-item">
            <button
              className="pagination-button"
              onClick={() => paginate(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
