import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Buttons({title, handler}) {
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={handler} sx={{
        
      }} variant="contained">{title}</Button>
    </Stack>
  );
}
