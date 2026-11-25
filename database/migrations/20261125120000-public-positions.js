'use strict';

// Public position pages need a life cycle on positions and room for real descriptions.
//
//   status      open | closed. The owner closes a position; a closed one leaves the
//               public list and the sitemap.
//   expires_at  an open position is listed until this moment (60 days after it was
//               posted or last reopened), so stale postings drop out by themselves.
//   closed_at   when it was closed, for the record.
//   is_remote   remote by default, which is what the product is about; the country on a
//               position then says where applicants should be based.
//
// Descriptions were varchar(255); a posting needs more than a sentence.

const POSITION_LIFETIME_DAYS = 60;
const LIST_INDEX = 'project_positions_public_list';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const positions = await queryInterface.describeTable('project_positions');

    if (!positions.status) {
      await queryInterface.addColumn('project_positions', 'status', {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      });
    }
    if (!positions.is_remote) {
      await queryInterface.addColumn('project_positions', 'is_remote', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }
    if (!positions.expires_at) {
      await queryInterface.addColumn('project_positions', 'expires_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    if (!positions.closed_at) {
      await queryInterface.addColumn('project_positions', 'closed_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    // Positions that already exist start their 60 days now.
    await queryInterface.sequelize.query(
      `UPDATE project_positions
          SET expires_at = DATE_ADD(NOW(), INTERVAL ${POSITION_LIFETIME_DAYS} DAY)
        WHERE expires_at IS NULL`,
    );

    await queryInterface.changeColumn('project_positions', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('project', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    const indexes = await queryInterface.showIndex('project_positions');
    if (!indexes.some((index) => index.name === LIST_INDEX)) {
      await queryInterface.addIndex(
        'project_positions',
        ['status', 'expires_at', 'createdAt'],
        { name: LIST_INDEX },
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('project_positions', LIST_INDEX);
    // Longer texts are cut to what the old columns can hold.
    await queryInterface.sequelize.query(
      'UPDATE project_positions SET description = LEFT(description, 255)',
    );
    await queryInterface.sequelize.query(
      'UPDATE project SET description = LEFT(description, 255)',
    );
    await queryInterface.changeColumn('project_positions', 'description', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.changeColumn('project', 'description', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
    await queryInterface.removeColumn('project_positions', 'closed_at');
    await queryInterface.removeColumn('project_positions', 'expires_at');
    await queryInterface.removeColumn('project_positions', 'is_remote');
    await queryInterface.removeColumn('project_positions', 'status');
  },
};
