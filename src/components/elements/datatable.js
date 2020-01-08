////////////////////////////////////////////////////////////////////////////////
// FILE: datatable.js
// AUTHOR: David Ruvolo
// CREATED: 2019-12-05
// MODIFIED: 2020-01-07
// PURPOSE: render an html datatable from an object
// DEPENDENCIES: NA
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import "../styles/datatable.scss"
function datatable(data, caption) {

    // <thead>
    let th = [];
    const colnames = Object.keys(data[0]);
    colnames.map((colname, index) => {
        return th.push(<th scope="col" key={index}>{colname}</th>)
    });

    // <tbody>
    let tbody = [], row, cell;
    data.map((d, dIndex) => {
        row = [];
        colnames.map((colname, cIndex) => {
            cell = <td role="cell" key={cIndex} className={typeof d[colname] === "number" ? "data-type-number" : null}>
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
        <table className="datatable">
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
    caption: PropTypes.string
}


// export
export default datatable