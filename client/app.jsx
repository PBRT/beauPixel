var React = require('react');
require('./app.css');
var _ = require('underscore');

var App = React.createClass({
    getInitialState() {
      return {display: this.displayType()};
    },
    // Media queries
    componentDidMount() {
      window.addEventListener('resize', this.debouncedHandleResize);
    },
    // Remove the listenner
    componentWillUnmount() {
      window.removeEventListener('resize', this.debouncedHandleResize);
    },
    debouncedHandleResize: _.debounce(function() {
      this.handleResize();
    }),
    // Update the state on resize window
    handleResize() {
      this.setState({display: this.displayType()});
    },
    displayType() {
      var display = null;

      if (window.innerWidth < 768) {
        display = 'mobile';
      } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        display = 'tablet';
      }
      return display;
    },
  render() {
    var s = getStyle();

    if (this.state.display === 'mobile') {
      s.subtitle.fontSize = '20px';
      s.subtitle.paddingTop = 0;
    }
    else if (this.state.display === 'tablet') {
      s.subtitle.fontSize = '30px';
      s.subtitle.paddingTop = 20;
    } else {
      s.subtitle.fontSize = '50px';
      s.subtitle.paddingTop = 40;
    }
             // <img src={require('../assets/images/mac1.jpeg')} style={s.backgroundImage}/>
    return (
      <div>
        <div style={s.mainContainer}>
          <img src={require('../assets/images/beaupixel__small.png')} style={s.logo}/>
          <div style={s.subtitle}> CRAFTING YOUR DIGITAL LOOK </div>
          <div style={s.footer}> DIGITAL AGENCY - LONDON - 2015 </div>
        </div>
      </div>
    )
  }
});

React.render(<App />, document.body);

function getStyle() {
  return {
    backgroundImage: {
      width: '100%',
      position: 'absolute',
      WebkitFilter: 'brightness(0.7)',
    },
    logo: {
      width: '80%',
      marginTop: '150px',
    },
    subtitle: {
      fontSize: 40,
      marginTop: '20px',
      color: 'white',
      padding: 40,
    },
    footer: {
      textAlign: 'center',
      fontSize: 12,
      color: 'white',
      width: '100%',
      paddingBottom: 30,
      marginTop: 100,
    },
    mainContainer: {
      position: 'relative',
      textAlign: 'center',
    }
  }
}
