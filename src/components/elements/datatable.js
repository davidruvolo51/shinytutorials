////////////////////////////////////////////////////////////////////////////////
// FILE: datatable.js
// AUTHOR: David Ruvolo
// CREATED: 2019-12-05
// MODIFIED: 2020-01-29
// PURPOSE: render an html datatable from an object
// DEPENDENCIES: NA
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import "../styles/datatable.scss"
function datatable(data, id, caption) {

    // <thead>
    let th = [];
    const colnames = Object.keys(data[0]);
    colnames.map((colname, index) => {
        return th.push(<th scope="col" key={index}>{colname}</th>)
    });

    // function for evaluating classnames for td elements
    function set_classname(value, col) {
        let css;
        const datatype = typeof value; 
        if(datatype === "number") {
          if(value > 0) {
              css = "datatype-number value-positive";
          } else if(value < 0){
            css = "datatype-number value-negative";
          } else if(value === 0){
            css = "datatype-number value-zero"
          }
        } else {
            css = `datatype-${typeof value}`;
        }
        css = css + " column-" + (col + 1);
        return(css)
    }

    // <tbody>
    let tbody = [], row, cell;
    data.map((d, dIndex) => {
        row = [];
        colnames.map((colname, cIndex) => {
            let css = set_classname(d[colname], cIndex);
            cell = <td role="cell" key={cIndex} className={css}>
                {cIndex > 0
                    ? (<>
                        <span className="hidden-colname">
                            {colname}
                        </span>
                        {d[colname]}
                    </>
                    )
                    : d[colname]
                }
            </td>
            return row.push(cell);
        })
        return tbody.push(<tr key={dIndex} role="row">{row}</tr>);
    });

    // <table>
    return (
        <table id={id ? id : null} className="datatable">
            {
                caption
                ? (
                    <caption>{caption}</caption>
                )
                : null
            }
            <thead>
                <tr role="row">
                    {th}
                </tr>
            </thead>
            <tbody>
                {tbody}
            </tbody>
        </table>
    )
}


// set props
datatable.propTypes = {
    data: PropTypes.object.isRequired,
    id: PropTypes.string,
    caption: PropTypes.string
}


// export
export default datatable