import React from 'react';
import Header from '../components/Header';
import Grid from 'material-ui/Grid';
import { styles } from './ShellStyles';
import AdminRoutes from '../../Users/Admin/AdminRoutes';
import FacultyRoutes from '../../Users/Faculty/FacultyRoutes';
import StudentRoutes from '../../Users/Student/StudentRoutes';
import LeftNavigationPanel from '../components/LeftNavigationPanel';
/*
    We 'could' combine these three into to one variable function, but it seemed to be simpler to just leave them separate
    This also makes it easier to handle changes in the Header, and Navigation for each role
 */

export const AdminProfile = (isMobile) => (
    <div className={styles.root}>
        <div className={styles.appFrame}>
            <Header handleDrawerToggle={this.handleDrawerToggle}/>
            <LeftNavigationPanel
                mobileOpen={isMobile}
                handleDrawerToggle={this.handleDrawerToggle}
            />
            <div style={{paddingLeft:'250px', position:'absolute'}}>
            <main className={styles.content}>
                <Grid container className={styles.gridRoot}>
                    {AdminRoutes}
                </Grid>
            </main>
            </div>
        </div>
    </div>
);

export const FacultyProfile = (isMobile) => (
    <div className={styles.root}>
        <div className={styles.appFrame}>
            <Header handleDrawerToggle={this.handleDrawerToggle}/>
            <LeftNavigationPanel
                mobileOpen={isMobile}
                handleDrawerToggle={this.handleDrawerToggle}
            />
            <main className={styles.content}>
                <Grid container className={styles.gridRoot}>
                    {FacultyRoutes}
                </Grid>
            </main>
        </div>
    </div>
);

export const StudentProfile = (isMobile) => (
    <div className={styles.root}>
        <div className={styles.appFrame}>
            <Header handleDrawerToggle={this.handleDrawerToggle}/>
            <LeftNavigationPanel
                mobileOpen={isMobile}
                handleDrawerToggle={this.handleDrawerToggle}
            />
            <main className={styles.content}>
                <Grid container className={styles.gridRoot}>
                    {StudentRoutes}
                </Grid>
            </main>
        </div>
    </div>
);
