import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Image";

export class images extends Component {
  state = {
    images: [],
    start: 1,
    count: 30
  };

  componentDidMount() {
    const { start, count } = this.state;
    axios.get(`/api/photos?count=${count}&start=${start}`).then(res => {
      this.setState({ images: res.data });
    });
  }

  fetchImages = () => {
    const { start, count } = this.state;
    this.setState(prevState => ({ start: prevState.start + count }));
    axios.get(`/api/photos?count=${count}&start=${start}`).then(res => {
      this.setState(prevState => ({
        images: prevState.images.concat(res.data)
      }));
    });
  };

  render() {
    const { images } = this.state;
    const imageList = images.map(image => (
      <Image key={image.id} image={image} />
    ));
    return (
      <div className="images">
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {imageList}
        </InfiniteScroll>
      </div>
    );
  }
}

export default images;
