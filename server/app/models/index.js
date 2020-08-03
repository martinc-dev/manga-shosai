const { Sequelize, DataTypes } = require('sequelize')
const { defaultPath } = require('../constants/path')

// Sequelize automatically adds createdAt and updateAt

const folderModel = {
  uuid: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
    comment: 'Uuid of folder (PK)'
  },
  path: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: defaultPath,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Path that leads to the folder, no trailing slash'
  },
  name: {
    allowNull: true,
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    },
    comment: 'Name of folder, or NULL for root'
  },
  folderCreatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Datetime(ISO) of the createdAt of the folder itself'
  },
  folderUpdatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Datetime(ISO) of the updatedAt of the folder itself'
  }
}

const fileModel = {
  uuid: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
    comment: 'Uuid of file (PK)'
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Name of file'
  },
  ext: {
    type: DataTypes.TEXT,
    comment: 'Extension of file, nullable'
  },
  size: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
    comment: 'Size is in bytes, default to 0'
  },
  thumbnail: {
    type: DataTypes.TEXT,
    comment: 'File name of the thumbnail without extension, nullable'
  },
  fileCreatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Datetime(ISO) of the createdAt of the file itself'
  },
  fileUpdatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      notNull: true
    },
    comment: 'Datetime(ISO) of the updatedAt of the file itself'
  }
}

const initializeModels = sequelize => {
  const Folder = sequelize.define('Folder', folderModel, {
    indexes: [
      {
        unique: true,
        fields: ['path', 'name']
      }
    ]
  })

  const File = sequelize.define('File', fileModel, {
    indexes: [
      {
        unique: true,
        fields: ['folderUuid', 'name', 'ext']
      }
    ]
  })

  // Let Sequelize automagically create a folderUuid by cloning folder.uuid
  Folder.hasMany(File, {
    foreignKey: 'folderUuid',
    onDelete: 'CASCADE'
  })
  File.belongsTo(Folder, {
    foreignKey: 'folderUuid'
  })

  return {
    Folder,
    File
  }
}

module.exports = {
  initializeModels
}
