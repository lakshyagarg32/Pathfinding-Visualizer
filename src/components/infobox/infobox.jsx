import React from "react";
import { FaAngleRight,FaBullseye,FaWeightHanging,FaB } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import "./infobox.css"

function InfoBox(){

    return(
        <div className="box">
            <div className="item">
                <div className="item-icon">
                <FaAngleRight style={{fontSize:"25px"}} />
                </div>
                <div className="item-info">
                <h5>Start Node</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <FaBullseye style={{fontSize:"25px"}} />
                </div>
                <div className="item-info">
                <h5>Finish Node</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <FaWeightHanging style={{fontSize:"25px"}} />
                </div>
                <div className="item-info">
                <h5>Weight Node{"(cost=10)"}</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <GiBrickWall style={{fontSize:"25px"}} />
                </div>
                <div className="item-info">
                <h5>Wall Node</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <div className="node-temp"></div>
                </div>
                <div className="item-info">
                <h5>Unvisited Node</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <div className="node-temp visited-node-1"></div>
                </div>
                <div className="item-icon">
                <div className="node-temp visited-node-2"></div>
                </div>
                <div className="item-info">
                <h5>Visited Nodes</h5>
                </div>
            </div>
            <div className="item">
                <div className="item-icon">
                <div className="node-temp shortest"></div>
                </div>
                <div className="item-info">
                <h5>Shortest-path Node</h5>
                </div>
            </div>
        </div>
    )

}

export default InfoBox;