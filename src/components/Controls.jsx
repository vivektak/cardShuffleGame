import React from 'react';

const Controls = (props) => {
    return (
        <div className='text-left ml-5 mt-5'>
            <button className='btn btn-primary' onClick={props.shuffle}>Play/Shuffle</button>
            <button className='btn btn-primary m-2' onClick={props.reset}>Reset high score</button>
        </div>
    );
}

export default Controls;