import {Pagination} from "react-bootstrap";
import React from "react";

/**
 * Callback to load a specified new page.
 *
 * @callback pageCallback
 * @param {int} page New page to load
 */

/**
 * Pagination controls
 * @param {Object} props
 * @param {pageCallback} props.callback Callback to load new page
 * @param {int} props.activePage The currently active page
 * @param {int} props.pageCount The number of pages total.
 * @constructor
 */
export default function PageControls(props) {
    let items = [];
    for (let number = 1; number <= props.pageCount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === props.activePage} onClick={() => props.callback(number)}>
                {number}
            </Pagination.Item>,
        );
    }
    return <Pagination>
        <Pagination.First disabled={props.activePage === 1} onClick={() => props.callback(1)} />
        <Pagination.Prev disabled={props.activePage === 1} onClick={() => props.callback(props.activePage - 1)} />
        {items}
        <Pagination.Next disabled={props.activePage === props.pageCount} onClick={() => props.callback(props.activePage + 1)} />
        <Pagination.Last disabled={props.activePage === props.pageCount} onClick={() => props.callback(props.pageCount)} />
    </Pagination>
}