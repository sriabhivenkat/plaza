import React from 'react';
import './Search.css';



const SearchPapers = () => {
    return(
        <>
            <div className="searchcontainer1">
                <h2>Find Papers</h2>
                <form>
                    <div className="inputfield">
                        <label>
                            <input name="keywordsearch" type="keywordsearch" placeholder="Enter keywords to find papers or researchers " size="100"/>
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SearchPapers;