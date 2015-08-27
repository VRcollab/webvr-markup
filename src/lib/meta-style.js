import CSS from 'css'

export default class MetaStyle {
  constructor (controller){
    this.metaStyle={}
    this.controller = controller
  }

  set ["material-color"](color) {
    var mesh = this.controller.metaObject.mesh
    if (mesh) {
      if(mesh.material.color){
        mesh.material.color.set(color);
      }else {
        for(var i = 0; i < mesh.material.materials.length; i++){
          mesh.material.materials[i].color.set(color);
        }
      }
      this.metaStyle["material-color"] = color
    }
    return color;
  }

  get ["material-color"]() {
    return this.metaStyle["material-color"];
  }

  set ["material-type"](type) {
    var mesh = this.controller.metaObject.mesh
    if (mesh) {
      switch (type) {
        case 'phong':
          mesh.material = new THREE.MeshPhongMaterial({color: this.metaStyle["material-color"]});
          break;
        default:
          mesh.material = new THREE.MeshBasicMaterial({color: this.metaStyle["material-color"]});
      }
      this.metaStyle["material-type"] = type;
      return mesh.material;
    }
  }

  get ["material-type"]() {
    return this.metaStyle["material-type"];
  }

  clear(){
    //TODO: need to set everything back to default
    this.metaStyle = {}
    this["material-color"] = 'white';
  }

  applyMetaStyleAttribute(){
    var metaStyleAttribute = this.controller.dom.getAttribute('meta-style');
    if (!metaStyleAttribute) {
      return
    }
    var cssString = `body {${metaStyleAttribute}}`
    var parsedCSSRules = CSS.parse(cssString).stylesheet.rules;
    var declarations = parsedCSSRules[0].declarations

    _.forEach(declarations, (declaration) => {
      this[declaration.property] = declaration.value
    })

  }

}