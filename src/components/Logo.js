import React, {Component} from 'react'

class Logo extends Component {
    render() {
        return(
            <div className='logo'>
                <a href='https://www.reviewtrackers.com' target='_blank' rel='noopener noreferrer'>
                <img alt='Review Trackers' src='https://www.reviewtrackers.com/wp-content/themes/reviewtrackers/assets/dist/img/RT-logo-horiz-onwhite.png' />
                </a>
            </div>
        )
    }
}
export default Logo;