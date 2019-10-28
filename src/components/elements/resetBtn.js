import React, { Component } from 'react'


class Reset extends Component {

    // function to reset selected tags and to show all blocks
    resetForm(){

        // gather elements
        const tags = document.querySelectorAll(".taglist .btn");
        const data = document.querySelectorAll(".post");

        // remove classes and show all posts
        tags.forEach(t => t.classList.remove("selected"));
        data.forEach(d => d.style.display = "block");
  
    }

    reset = (event) => {
        this.resetForm()
    }

    render() {
        return(
            <button id="reset" className="btn btn-secondary" onClick={this.reset}>Reset filters</button>
        )
    }

}


export default Reset