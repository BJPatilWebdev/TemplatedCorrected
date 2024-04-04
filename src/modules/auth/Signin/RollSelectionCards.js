import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
} from '@mui/material';
import Image from 'next/image';

function RollSelectionCards({setSelectedOption}) {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-evenly'
      alignItems='center'
      sx={{mx: 20}}
      spacing={3}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Button onClick={()=>setSelectedOption('recruiter')}>
          <Card>
            <Image
              src='/assets/images/rc-img.png'
              width={100}
              height={60}
              layout='responsive'
              objectFit='contain'
            />
            <CardContent>
              <Typography variant='h3' component='h2'>
                I am a Recruiter
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Button onClick={()=>setSelectedOption('seeker')}>
          <Card>
            <Image
              src='/assets/images/jobseek.png'
              width={100}
              height={60}
              layout='responsive'
              objectFit='contain'
            />
            <CardContent>
              <Typography variant='h3' component='h2'>
                I am a Job Seeker
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Button onClick={()=>setSelectedOption('buddy')}>
          <Card>
            <Image
              src='/assets/images/refer.png'
              width={100}
              height={57}
              layout='responsive'
              objectFit='contain'
            />
            <CardContent>
              <Typography variant='h3' component='h2'>
                I am a Buddy
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                I am a buddy seeking referrals to help connect talented
                individuals with rewarding opportunities.
              </Typography>
            </CardContent>
          </Card>
        </Button>
      </Grid>
    </Grid>
  );
}

export default RollSelectionCards;
