class MetaTextController extends MRM.MetaComponentController {
  constructor(dom){
    super(dom)
    this.setupComponent();
    this.parent = dom.parentElement.controller;

    this.properties.text = this.dom.innerText || '';

    this.metaObject = this.createMetaObject();
    this.metaObject.mesh.position.set(0,0,0.2)

    this.updateMetaObject()
  }

  get propertiesSettings() {
    return {
      width: {type: Number, default: 1, attrName: 'width'},
      length: {type: Number, default: 1, attrName: 'length'}
    }
  }

  get eventActionSettings(){
    return {
      "width": ["updateChildrenDisplayInline"],
      "length": ["updateChildrenDisplayInline"],
      "meta-style": ['propagateMetaStyle'],
      "class": ["propagateMetaStyle"],
      "id": ["propagateMetaStyle"]
    }
  }

  get metaAttachedActions(){
    return {
      "attachMetaObject": true,
      "updateChildrenDisplayInline": true
    }
  }

  get tagName() {
    return "meta-text"
  }

  createMetaObject(){
    var planeLength = 1;
    var planeWidth = 1;

    var canvas1 = document.createElement('canvas');
    var context1 = canvas1.getContext('2d');
    context1.fillStyle = "rgba(255, 0, 0, 0.95)";
    context1.font = "26px Arial"

    context1.fillText(this.properties.text, 0, 50);

    var texture = new THREE.Texture(canvas1);
    texture.needsUpdate = true;
    var geometry = new THREE.PlaneGeometry(planeWidth, planeLength,1,1);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0x333333,
      side: THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(geometry, material);
    var group = new THREE.Group();

    group.add(mesh);

    return {
      mesh: mesh,
      group: group
    }
  }

  updateMetaObject(){
    var mesh = this.metaObject.mesh;
    mesh.scale.x = this.properties.width
    mesh.scale.y = this.properties.length
    if(this.metaStyle.metaStyle["position"] === 'absolute'){
      var group = this.metaObject.group;
      group.position.x = - (this.parent.properties.width/2) + (this.metaStyle["left"] || 0) + (this.properties.width/2);
      group.position.y = (this.parent.properties.length/2) - (this.metaStyle["top"] || 0) - (this.properties.length/2);
    }
  }
}

class MetaText extends MRM.MetaComponent {
  createdCallback() {
    this.controller = new MetaTextController(this);
    super.createdCallback();
  }
}

document.registerElement('meta-text', MetaText);
