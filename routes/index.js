
/*
 * GET home page.
 */
var d3renderer = require('d3renderer')

exports.index = function(req, res){
    var circles = [];
    var num = 0|Math.random() * req.query.num || 100;
    var colors = d3.scale.category20();
    for(var i = 0; i < num; i++){
        circles.push({
            cx: 0|Math.random() * 400
            , cy: 0|Math.random() * 400
            , r: 0|Math.random() * 40
            , opacity: .5
            , color: colors(0|Math.random() * 10)
        });
    }
    d3.select('svg').remove();
    var svg = d3.select('body').append('svg').attr('width', '500').attr('height', 500);
    svg.selectAll('circle').data(circles).enter().append('circle')
        .attr('cx', function(d){ return d.cx})
        .attr('cy', function(d){ return d.cy})
        .attr('r', function(d){ return d.r})
        .attr('opacity', function(d){ return d.opacity})
        .style('fill', function(d){ return d.color});

    res.set('Pragma', 'no-cache');
    d3.render(function(err, base64){
        res.render('index', { title: 'Express', image: base64 });
    });
};