import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import '../../index.css';


const useStyles = makeStyles((theme) =>({
    animateCircle : {
        fill : '#fbffdc',
        animation: `$myEffect 500ms ${theme.transitions.easing.easeInOut}`
      
    },
    dataLabel: {
        '&:hover': {
            fill: 'black',
        },     
      },
      animatedItem: {
        animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`
      },
      animatedItemExiting: {
        animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
        opacity: 0,        
      },
      "@keyframes myEffect": {
        "0%": {
          opacity: 0,          
        },
        "100%": {
          opacity: 1,    
        }
      },
      "@keyframes myEffectExit": {
        "0%": {
          opacity: 1,
          
        },
        "100%": {
          opacity: 0,         
        }
      }
    
    }));

const Interchart =(props) => {
    // const [points, setPoints] = useState();
    const classes = useStyles(props);  

    const [selectedDataPoint, setSelectedDataPoint] = useState();

    // Properties --------------------------------------------------------
    const padding = props.padding || 25;
    const fontHeightAxis = props.fontHeightAxis || 20;

    const width = props.width || 400;
    const height = props.height || 400;
    const startX = 0;
    
    const labelXAxis = props.XAxisLabel || "x-axis";
    const labelYAxis = props.YAxisLabel || "y-axis";
 
    const labelColor = props.labelColor || "black";
    const dataPoints = props.dataPoints || [];

    const dataWidth = width - 2*padding;
    const dataHeight = height - 2*padding;

    // ---------------------------------------------------------------------

    useEffect(() => {
        // Update the document title using the browser API
      });

      
    const useHover = () => {
        const [hovered, setHovered] = useState(false);
        
        
        const eventHandlers = useMemo(() => ({
            onMouseOver(event) { 
                setSelectedDataPoint(event.target.id);
                setHovered(true);
            },
            onMouseOut() { 
                setSelectedDataPoint(false);
                setHovered(false); 
            },
        }), []);
        
        return [hovered, eventHandlers];
    }
  

    const Axis = (props) => (
        <polyline      
          fill="none"      
          stroke="#000"      
          strokeWidth="1"      
          points={props.points}
          shapeRendering="crispEdges"
        />      
        )
        
    const QuadrantLine = (props) => (
        <polyline      
          fill="none"      
          stroke="#ccc"      
          strokeWidth=".5"      
          points={props.points}
          //shape-rendering="geometricPrecision"
          shapeRendering="crispEdges"
        />      
    )

      // Axis start point: (padding, height - padding)      
      // Axis end point: (width - padding, height - padding      
    const XAxis = () => (
        <Axis
            points={`${padding},${height - padding} ${width - padding},${height - padding}`}      
            />      
    );
        
    // Axis start point: (padding, padding)      
    // Axis end point: (padding, height - padding)      
    const YAxis = () => (      
        <Axis      
            points={`${padding},${padding} ${padding},${height - padding}`}      
        />      
    );

    const QuandrantAxis = () => (
        <React.Fragment>
            <QuadrantLine points={`${width/2},${padding} ${width/2},${height-padding}`} />
            <QuadrantLine points={`${startX+padding},${height/2} ${width-padding},${height/2}`} />
            

        </React.Fragment>
    )


    const YAxisLabel = (props) => {        
        const [xPos , yPos ] = [ startX + padding - fontHeightAxis / 2, height ];
        const labelName = props.label1 || "Benefits"
        const labelName1 = props.label1 || "Low"
        const labelName2 = props.label2 || "High"

    
        return (
            <React.Fragment>
                <text x={xPos} y={yPos*.75} fontFamily='ArchitectsDaughter' fill={labelColor} shapeRendering="geometricPrecision" fontSize="1.2em" textAnchor="middle" dominantBaseline="central" transform={`${"rotate(-90, "+xPos+", "+yPos*.75+")"}`}>
                    {labelName1}
                </text>

                <text x={xPos} y={yPos*.5} fontFamily='ArchitectsDaughter' fill={labelColor} shapeRendering="geometricPrecision" fontSize="1.4em" textAnchor="middle" dominantBaseline="central" transform={`${"rotate(-90, "+xPos+", "+yPos*.5+")"}`}>
                    {labelName}
                </text>

                <text x={xPos} y={yPos*.25} fontFamily='ArchitectsDaughter' fill={labelColor} shapeRendering="crispEdges" fontSize="1.2em" textAnchor="middle" dominantBaseline="central" transform={`${"rotate(-90, "+xPos+", "+yPos*.25+")"}`}>
                    {labelName2}
                </text>
            </React.Fragment>
        )
    };

    const XAxisLabel = (props) => {
        const [xPos , yPos ] = [ startX + width, height - fontHeightAxis / 2 ];
        const labelName = props.label || "Risk"
        const labelName1 = props.label1 || "Low"
        const labelName2 = props.label2 || "High"
    
        return (
            <React.Fragment>
                <text x={xPos*.25} y={yPos} fontFamily='ArchitectsDaughter' fill={labelColor} fontSize="1.2em" textAnchor="middle" dominantBaseline="central">
                    {labelName1}
                </text>

                <text x={xPos*.5} y={yPos} fontFamily='ArchitectsDaughter' fill={labelColor} fontSize="1.4em" textAnchor="middle" dominantBaseline="central">
                    {labelName}
                </text>

                <text x={xPos*.75} y={yPos} fontFamily='ArchitectsDaughter' fill={labelColor} fontSize="1.2em" textAnchor="middle" dominantBaseline="central">
                    {labelName2}
                </text>
            </React.Fragment>
        )
    };

    const PointLabel = (props) => {
        const [x , y ] = [ props.x, props.y-fontHeightAxis-11];
        const labelName = props.label || "X-Axis"

        return (
            <text  x={x} y={y} className={classes.dataLabel} fontFamily='ArchitectsDaughter' fill={labelColor} fontSize="1.25em" textAnchor="middle" dominantBaseline="central">
                {labelName}
            </text>
        )
    };

    const DataPoint = (props) => {
        const [isHovering, mouseHoverEvents] = useHover();
        const {x,y,label} = props
        const index = 0;
        const onColor = props.onColor || "#000";
        const offColor = props.offColor || "#0017ff";
        
        return (     
            <React.Fragment>                
                {isHovering && <circle key={`${"circle_l_index_" + index}`}  cx={x} cy={y} className={classes.animateCircle} r="18" stroke="gray" strokeWidth="1" /> }
                                
                <foreignObject x={x-12} y={y-12} width="30" height="30"  >                    
                    {isHovering && < EmojiObjectsOutlinedIcon  style={{ color:onColor }} />}
                    {!isHovering && <EmojiObjectsRoundedIcon style={{ color:offColor }} />}
                </foreignObject>
    
                {isHovering && <PointLabel key={`${"circlelabel_index_" + index}`}  x={x} y={y} label={label} />}
                <circle id = {label} key={`${"circle_b_index_" + index}`} {...mouseHoverEvents} cx={x} cy={y} r="25" strokeWidth="0" fill="transparent"  />            
        </React.Fragment>
       );
    }

    const clickEvent = (event) => {
        var e = event.target;
        var dim = e.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        console.log("x: "+x+" y:"+y);

        selectedDataPoint && console.log("selected item" + selectedDataPoint);
        
    }
    

    const DataPoints = (props) => {
        const points = props.dataPoints || [];

        const ptX = 50;
        const ptY = 50;
        
        const circles = points.map((point, index)=> {
            const x = point.x + padding;
            const y = height - point.y - padding;

            // Calculate the quandrant:
            let myColor = "#000";            
            myColor = (x-padding < dataWidth/2) && (y-padding<dataHeight/2) ? "#5e8c31" : myColor;                        
            myColor = (x-padding < dataWidth/2) && (y-padding>=dataHeight/2) ? "#ff7034" : myColor;                        
            myColor = (x-padding >= dataWidth/2) && (y-padding<dataHeight/2) ? "#f2c649" : myColor;                        
            myColor = (x-padding >= dataWidth/2) && (y-padding>=dataHeight/2) ? "#c32148" : myColor;                        
            
            return(
                <DataPoint {...props} key={"dp"+index }x={x} y={y} label={point.label} offColor={myColor}  />                  
            )});
             
        return (            
            <React.Fragment>            
                { circles }
            </React.Fragment>
           );
    }


    
    /*
  <style>
                    { `@font-face {
                            font-family: 'Pacifico';
                            src: url(https://fonts.gstatic.com/s/pacifico/v13/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');     
                    } ` }
                </style>
    */

    return (
        <svg width={width} height={height} onClick={clickEvent} >            
            <QuandrantAxis />
            <XAxis/>
            <YAxis/> 
            <YAxisLabel label = {labelYAxis} />
            <XAxisLabel label = {labelXAxis} />
            <DataPoints dataPoints = {dataPoints}  />   
        </svg>
    );
};

export default Interchart;