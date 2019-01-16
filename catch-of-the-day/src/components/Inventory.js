import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fish).map(fish => 
        <EditFishForm 
        key={fish} 
        index={fish}
        fish={this.props.fish[fish]} 
        updateFish={this.props.updateFish}/>
        )}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
