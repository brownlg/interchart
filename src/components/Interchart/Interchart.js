import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';


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
    const [points, setPoints] = useState();
    const classes = useStyles(props);  


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

    // ---------------------------------------------------------------------

    useEffect(() => {
        // Update the document title using the browser API
      });

      
    const useHover = () => {
        const [hovered, setHovered] = useState();
        
        const eventHandlers = useMemo(() => ({
            onMouseOver() { setHovered(true); },
            onMouseOut() { setHovered(false); }
        }), []);
        
        return [hovered, eventHandlers];
    }
  

    const Axis = (props) => (
        <polyline      
          fill="none"      
          stroke="#ccc"      
          strokeWidth="3"      
          points={props.points}
        />      
        )
    
    const QuadrantLine = (props) => (
        <polyline      
          fill="none"      
          stroke="#555"      
          strokeWidth="1"      
          points={props.points}
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
        const [xPos , yPos ] = [ startX + padding - fontHeightAxis / 2, height / 2 ];
        const labelName = props.label || "Y-Axis"
    
        return (
            <text x={xPos} y={yPos} font='roboto' fill={labelColor} fontSize="1em" textAnchor="middle" dominantBaseline="central" transform={`${"rotate(-90, "+xPos+", "+yPos+")"}`}>
                {labelName}
            </text>
        )
    };

    const XAxisLabel = (props) => {
        const [xPos , yPos ] = [ startX + width / 2, height - fontHeightAxis / 2 ];
        const labelName = props.label || "X-Axis"
    
        return (
            <text x={xPos} y={yPos} font='roboto' fill={labelColor} fontSize="1em" textAnchor="middle" dominantBaseline="central">
                {labelName}
            </text>
        )
    };

    const PointLabel = (props) => {
        const [x , y ] = [ props.x, props.y-fontHeightAxis-11];
        const labelName = props.label || "X-Axis"

        return (
            <text  x={x} y={y} className={classes.dataLabel} font='roboto' fill={labelColor} fontSize="1.25em" textAnchor="middle" dominantBaseline="central">
                {labelName}
            </text>
        )
    };

    const DataPoint = (props) => {
        const [isHovering, mouseHoverEvents] = useHover();
        const {x,y,label} = props
        const index = 0;

           
        return (     
            <React.Fragment>                
                {isHovering && <circle key={`${"circle_l_index_" + index}`}  cx={x} cy={y} className={classes.animateCircle} r="18" stroke="gray" strokeWidth="1" /> }
                                
                <foreignObject x={x-12} y={y-12} width="30" height="30"  >                    
                    {isHovering && < EmojiObjectsOutlinedIcon />}
                    {!isHovering && <EmojiObjectsRoundedIcon />}
                </foreignObject>
    
                {isHovering && <PointLabel key={`${"circlelabel_index_" + index}`}  x={x} y={y} label={label} />}
                <circle key={`${"circle_b_index_" + index}`}  {...mouseHoverEvents} cx={x} cy={y} r="25" strokeWidth="0" fill="transparent"  />            
        </React.Fragment>
       );
    }

    const DataPoints = (props) => {
        const points = props.dataPoints || [];

        const ptX = 50;
        const ptY = 50;

        const circles = points.map((point, index)=> {
            const x = point.x + padding;
            const y = height - point.y - padding;
                        
            return(
                <DataPoint x={x} y={y} label={point.label} />                  
            )});
             
        return (            
            <React.Fragment>            
                { circles }
            </React.Fragment>
           );
    }

    const clickEvent = (event) => {
        var e = event.target;
        var dim = e.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        console.log("x: "+x+" y:"+y);


    }

    return (
        <svg width={width} height={height} onClick={clickEvent}>
            <QuandrantAxis />
            <XAxis/>
            <YAxis/> 
            <YAxisLabel label = {labelYAxis} />
            <XAxisLabel label = {labelXAxis} />
            <DataPoints dataPoints = {dataPoints}/>   
        </svg>
    );
};

export default Interchart;